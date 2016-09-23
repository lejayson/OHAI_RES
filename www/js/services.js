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
    };
})

.service('$infoProperties', function() {
    var name;
	var gender;
	var description;
	var environment;
	var isGroup;
	var ageGroup;
  var subemail;
  var subphone;
    
    return {
        getName: function() {
            return name;
        },
        setName: function(nm) {
            name = nm;
        },
		getGender: function() {
            return gender;
        },
        setGender: function(gend) {
            gender = gend;
        },
		getDesc: function() {
            return description;
        },
        setDesc: function(desc) {
            description = desc;
        },
		getEnv: function() {
            return environment;
        },
        setEnv: function(env) {
            environment = env;
        },
		getAdult: function() {
            return Adult;
        },
        setAdult: function(adl) {
            Adult = adl;
        },
        getChild: function() {
            return Children;
        },
        setChild: function(chd) {
            Children = chd;
        },
		getisGroup: function() {
            return isGroup;
        },
        setisGroup: function(grp) {
            isGroup = grp;
        },
		getInv: function() {
            return ageGroup;
        },
        setInv: function(inv) {
            ageGroup = inv;
		},
        getEmail: function() {
            return subemail;
        },
        setEmail: function(eml) {
            subemail = eml;
        },
        getPhone: function() {
            return subphone;
        },
        setPhone: function(phn) {
            subphone = phn;
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
});



