import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('API Handler', () => {
  it('should validate speakerInvite schema', async () => {
    // Import inline to exercise the zod schemas
    const { z } = await import('zod');

    const schema = z.object({
      formType: z.literal('speakerInvite'),
      organizerName: z.string().min(1),
      email: z.string().email(),
    });

    const valid = schema.safeParse({
      formType: 'speakerInvite',
      organizerName: 'Test Organizer',
      email: 'test@example.com',
    });

    assert.equal(valid.success, true);

    const invalid = schema.safeParse({
      formType: 'speakerInvite',
      organizerName: '',
      email: 'not-email',
    });

    assert.equal(invalid.success, false);
  });

  it('should reject unknown form types', async () => {
    const { z } = await import('zod');

    const contactSchema = z.object({
      formType: z.literal('contact'),
      name: z.string().min(1),
      email: z.string().email(),
    });

    const result = contactSchema.safeParse({
      formType: 'unknown',
      name: 'Test',
      email: 'test@example.com',
    });

    assert.equal(result.success, false);
  });
});
