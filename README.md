#postal.preserve

##v0.1.0
The API is still fluctuating. Expect changes.

##What Is It?
This is an add-on for [postal.js](https://github.com/postaljs/postal.js) that provides message "durability" features. If a message is published with a `preserve` header value set to `true`, it will be preserved so that future subscribers that match the channel and topic will receive it if they call `enlistPreserved()` to opt into receiving preserved messages.

##Usage

To publish a message that should be preserved, you need add the proper `header(s)` to the envelope:

	var ui = postal.channel("ui");
	ui.publish({
		topic: "something.happened",
		data: {
			foo: 'bar'
		},
		headers: {
			preserve: true,
			expires: new Date("2020-05-15T04:45:00.000Z");
		}
	});

You can see in the above example that you may optionally provide an `expires` header that is a valid JavaScript `Date` instance. Any time a new subscriber opts in to preserved messages, expired messages are purged *first*, before the new subscriber receives anything.

To opt into receiving preserved messages:

	var sub = ui.subscribe("something.happened", function (data, envelope) {
		// do stuff with data, etc.
	}).enlistPreserved();

## Building

