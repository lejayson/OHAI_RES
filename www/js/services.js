angular.module('app.services', [])

.service('$locationProperties', function() {
    var Location;
    
    return {
        getLoc: function() {
            return Location;
        },
        setLoc: function(latlng) {
            Location = latlng;
        }
    }
})

.service('$infoProperties', function() {
    var name;
    
    return {
        getNm: function() {
            return name;
        },
        setNm: function(nm) {
            name = nm;
        }
    }
})

.service('$usernameProperties', function() {
    var username = {};
    
    return {
        getUser: function() {
            return username;
        },
        setUser: function(user) {
            username = user;
        }
    }
})

.service('$passwordProperties', function() {
    var password = {};
    
    return {
        getPassword: function() {
            return password;
        },
        setPassword: function(pw) {
            password = pw;
        }
    }
})

.service('$confpasswordProperties', function($passwordProperties, $ionicPopup) {
    var confpassword = {};
    
    return {
        getconfPassword: function() {
            return confpassword;
        },
        setconfPassword: function(cpw) {
			if(cpw == $passwordProperties.getPassword()){
				confpassword = cpw;
			}
			else{
				var alertPopup = $ionicPopup.alert({
					title: 'Password not match',
					template: 'Please check your Password!'
				});
				confpassword = {};
			}
            
        }
    }
})

.service('$emailProperties', function() {
    var email = {};
    
    return {
        getemail: function() {
            return email;
        },
        setemail: function(em) {
            email = em;
        }
    }
})

.service('$roleProperties', function() {
    var role = {};
    
    return {
        getrole: function() {
            return role;
        },
        setrole: function(rl) {
            role = rl;
        }
    }
})

/***
.service('LoginService', function($q, $http) {
    return {
        loginUser: function(name, pw, cred, config) {
            var deferred = $q.defer();
            var promise = deferred.promise;
			
			console.log(cred);
			$http.post("http://test.appkauhale.com/Credential/passvariable.php", cred, config)
				.then(function(posted){
					reply = posted;
					console.log('pass', JSON.stringify(reply));
			});
	
            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});
***/