$(function() {
 
    Parse.$ = jQuery;
 
    // Replace this line with the one on your Quickstart Guide Page
    //Parse.initialize("G9gUmwaT7FAM12QKarClFkU5zO1YTJuXDwf6XyOj", "ZhdgfHeLwSMyVfQhx0BdX88kutTHCUH9bFZV2LMy");
 
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      alert("yay! it worked");
    });
 
});