# Queue Module

To add a new queue job, below were example

```ts
// add job event to `apps/backend/src/modules/queue/queue.constant.ts`
export const QueueJobEvent = {
  XXXX: 'XXX',
};

// add the processor input type to module
export type SomeXxxProcessorInput = {
  reference: string;
};

// create job with input type at where event being triggered
const reference = 'xxx';
const jobId = `void-purchase-${reference}`;
this.commandBus.execute(
  new CreateOneQueueJobCommand<SomeXxxProcessorInput>({
    input: {
      id: jobId,
      name: QueueJobEvent.Xxx,
      reference,
      data: { reference },
    },
    options: { jobOptions: { timeout } },
  })
);
```

In side the queue.processor.ts, add the handler code

```ts
// add the handler to the callback
if (args.event === QueueJobEvent.Xxx) {
  await this.commandBus.execute(
    new SomeCommand({
      input: args,
    })
  );
}
```
