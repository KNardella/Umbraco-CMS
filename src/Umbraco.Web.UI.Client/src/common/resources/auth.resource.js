/**
    * @ngdoc factory 
    * @name umbraco.resources.authResource     
    * @description Loads in data for authentication
    **/
function authResource($q, $http, umbDataFormatter, umbRequestHelper) {

    /** internal method to get the api url */
    function getLoginUrl() {
        return Umbraco.Sys.ServerVariables.authenticationApiBaseUrl + "PostLogin";
    }
    

    return {
        performLogin: function (username, password) {

            var deferred = $q.defer();
            //send the data
            $http.post(getLoginUrl(), {username: username, password: password}).
                success(function (data, status, headers, config) {                    
                    deferred.resolve(data);
                    
                }).
                error(function (data, status, headers, config) {
                    deferred.reject('Login failed for user ' + username);
                });

            return deferred.promise;
        }
    };
}

angular.module('umbraco.resources').factory('authResource', authResource);
