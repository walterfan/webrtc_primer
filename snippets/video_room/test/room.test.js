module('Tests of Room class');


test("test Room creation ", function() {
    ok(CreateRoom, "Check if Room exist");
    var roomObj = CreateRoom("test meeting");
    ok(roomObj, "check if the room created");
    equal(roomObj.toString(), "Room: a multiple user chat room", "test toString");
});