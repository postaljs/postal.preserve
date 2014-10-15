/*global postal,$ */
(function(postal, $) {
    // expired message
    postal.publish({
        channel: "hai",
        topic: "some.topic",
        data: {
            foo: "bar"
        },
        headers: {
            preserve: true,
            expires: new Date("2014-05-15T04:43:00.000Z")
        }
    });

    // expired message
    postal.publish({
        channel: "hai",
        topic: "another.thing",
        data: {
            baz: "bacon"
        },
        headers: {
            preserve: true,
            expires: new Date("2014-05-15T04:45:00.000Z")
        }
    });

    // un-expired message
    postal.publish({
        channel: "hai",
        topic: "another.thing",
        data: {
            baz: "bacon"
        },
        headers: {
            preserve: true,
            expires: new Date("2020-05-15T04:45:00.000Z")
        }
    });

    // un-expired message
    postal.publish({
        channel: "hai",
        topic: "and.one.more.thing",
        data: {
            baz: "bacon"
        },
        headers: {
            preserve: true,
            expires: new Date("2020-05-15T04:45:00.000Z")
        }
    });

    postal.subscribe({
        channel: "hai",
        topic: "#",
        callback: function(d, e) {
            $("body").append("<div><pre>" + JSON.stringify(e, null, 2) + "</pre></div>");
        }
    }).enlistPreserved();
}(postal, $));
