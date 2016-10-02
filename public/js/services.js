myApp.service("dbServices", function () {

    var self = this;
    this.bUrl = "https://hostelms.firebaseio.com/";
    
    this.get = function(subUrl , callBack)
    {
        var ref = new Firebase( self.bUrl + subUrl );
        ref.on("value", function( snapshot ){
            callBack(snapshot.val());
        });

    };
	
    this.push = function( subUrl, toPush )
    {
        var ref = new Firebase( self.bUrl + subUrl );
        ref.push(toPush);
    };
    
    this.set = function( subUrl, toSet )
    {
        var ref = new Firebase( self.bUrl + subUrl );
        ref.set(toSet);
    };
	
    this.delete = function( subUrl)
    {
        var ref = new Firebase( self.bUrl + subUrl );
        ref.remove();
    };
    
    this.update = function( subUrl, obj, callBack )
	{
		var ref = new Firebase( self.bUrl + subUrl );
        ref.update( obj );
		callBack();
	};
    
});