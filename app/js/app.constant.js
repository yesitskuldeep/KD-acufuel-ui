(function(){
'use strict';

	angular.module('acufuel')
	
	.constant('BASE_URL', {
		// url: 'http://54.149.169.33:8080/ws'
        //url: 'http://192.168.1.175:8080/ws'
        //url: 'http://192.168.1.8:8080/ws'
        url: 'http://192.168.2.137:8080/ws'

	})

	.constant('AUTH_EVENTS', {
        updateUser: 'update-user',
        notAuthorized: 'auth-not-authorized'
    })

    .constant('USER_ROLES', {
        user : 'user',
        admin: 'admin'
    });
    
})();