import { ExpressAdapter } from '@bull-board/express';
import * as Queue from 'bull';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { createBullBoard } from '@bull-board/api';

export const serverAdapter = new ExpressAdapter().setBasePath('/bull/queues');

const VolunteersRequest = new Queue('volunteers_request');

createBullBoard({
  queues: [new BullAdapter(VolunteersRequest)],
  serverAdapter: serverAdapter,
});
