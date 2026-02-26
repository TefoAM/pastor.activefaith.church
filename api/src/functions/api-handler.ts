import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Validation Schemas
// ---------------------------------------------------------------------------

const speakerInviteSchema = z.object({
  formType: z.literal('speakerInvite'),
  organizerName: z.string().min(1).max(200),
  organizerRole: z.string().min(1).max(200),
  organization: z.string().min(1).max(200),
  organizerWebsite: z.string().max(500).optional().default(''),
  email: z.string().email().max(254),
  phone: z.string().min(1).max(50),
  eventName: z.string().min(1).max(300),
  city: z.string().min(1).max(100),
  venueType: z.string().min(1).max(50),
  proposedDates: z.string().min(1).max(200),
  sessionCount: z.string().min(1).max(10),
  audienceSize: z.string().min(1).max(20),
  audienceType: z.string().min(1).max(50),
  theme: z.string().min(1).max(2000),
  technicalNotes: z.string().max(2000).optional().default(''),
  consentProcessing: z.literal(true),
  honeypot: z.string().max(0).optional(),
});

const contactSchema = z.object({
  formType: z.literal('contact'),
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  subject: z.string().min(1).max(300),
  message: z.string().min(1).max(5000),
  honeypot: z.string().max(0).optional(),
});

const mediaKitSchema = z.object({
  formType: z.literal('mediaKit'),
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  organization: z.string().max(200).optional().default(''),
  optInUpdates: z.boolean(),
  honeypot: z.string().max(0).optional(),
});

const submissionSchema = z.discriminatedUnion('formType', [
  speakerInviteSchema,
  contactSchema,
  mediaKitSchema,
]);

// ---------------------------------------------------------------------------
// Table Storage Client
// ---------------------------------------------------------------------------

function getTableClient(): TableClient {
  const connectionString = process.env['AzureWebJobsStorage'] || process.env['TABLE_STORAGE_CONNECTION'];
  if (!connectionString) {
    throw new Error('TABLE_STORAGE_CONNECTION or AzureWebJobsStorage is not configured');
  }
  return TableClient.fromConnectionString(connectionString, 'PastorSubmissions');
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

async function submitHandler(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  try {
    const body = await request.json();
    const result = submissionSchema.safeParse(body);

    if (!result.success) {
      context.log('Validation failed:', result.error.flatten());
      return {
        status: 400,
        jsonBody: { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      };
    }

    const data = result.data;

    // Honeypot check — silently accept but don't persist
    if ('honeypot' in data && data.honeypot) {
      context.log('Honeypot triggered — bot submission discarded');
      return { status: 200, jsonBody: { message: 'Submission received' } };
    }

    // Persist to Azure Table Storage
    const tableClient = getTableClient();

    // Ensure table exists (idempotent)
    await tableClient.createTable();

    const timestamp = new Date().toISOString();
    const entity = {
      partitionKey: data.formType,
      rowKey: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      submittedAt: timestamp,
      ...data,
      // Store consent as string for Table Storage compatibility
      ...(('consentProcessing' in data) ? { consentProcessing: String(data.consentProcessing) } : {}),
      ...(('optInUpdates' in data) ? { optInUpdates: String(data.optInUpdates) } : {}),
    };

    await tableClient.createEntity(entity);
    context.log(`Submission persisted: ${data.formType} — ${entity.rowKey}`);

    // Optional: send notification email (Phase 2 — ACS integration)
    // For now, admin checks Table Storage or sets up a Logic App trigger.

    return {
      status: 200,
      jsonBody: { message: 'Submission received' },
    };
  } catch (err) {
    context.error('Submit handler error:', err);
    return {
      status: 500,
      jsonBody: { error: 'Internal server error' },
    };
  }
}

// ---------------------------------------------------------------------------
// Route Registration
// ---------------------------------------------------------------------------

app.http('submit', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'submit',
  handler: submitHandler,
});

// GET /api/submissions — admin read (future: protect with function key or SWA auth)
app.http('list-submissions', {
  methods: ['GET'],
  authLevel: 'function',
  route: 'submissions',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const formType = request.query.get('formType') ?? 'speakerInvite';
      const tableClient = getTableClient();

      const entities: Record<string, unknown>[] = [];
      const query = tableClient.listEntities({
        queryOptions: { filter: `PartitionKey eq '${formType}'` },
      });

      for await (const entity of query) {
        entities.push(entity);
      }

      return { status: 200, jsonBody: entities };
    } catch (err) {
      context.error('List submissions error:', err);
      return { status: 500, jsonBody: { error: 'Internal server error' } };
    }
  },
});
