'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])
    .controller('ViewCtrl', function ($scope, $http) {

        // Register
        $scope.registerForm = function() {
            if ($scope.form.password != $scope.form.confirmPassword) {
                alert("Password Should Match");
            }

            else{
                var req = $http.post('http://127.0.0.1:3000/register', $scope.form);
                console.log($scope.form);
                req.success(function (data, status, headers, config) {
                    $scope.message = data;
                    alert("Successfully Registered");

                    window.location.href = "index.html";
                });
                req.error(function (data, status, headers, config) {
                    alert(data.result);
                });
            }
        };

        //Login
        $scope.loginForm = function() {
            var req = $http.post('http://127.0.0.1:3000/login',$scope.form );
            req.success(function(data, status, headers, config) {
                console.log(data.data);
                sessionStorage.setItem("User", JSON.stringify(data));
                window.location.href ="home.html";
            });
            req.error(function(data, status, headers, config) {
                $scope.errorMessage = data.result;
                console.log(data.result)
            });

        }


        //auto populate
        $scope.auto = function() {
            var user = JSON.parse(sessionStorage.getItem("User"));
            $scope.first_name = user.data.First_Name;
            $scope.last_name = user.data.Last_Name;
            $scope.email_id = user.data.Email_Id;
            $scope.phone_number = user.data.Phone;

        }

        //auto populate
        $scope.usersList = function() {
            var req = $http.get('http://127.0.0.1:3000/getUsers');
            req.success(function(data, status, headers, config) {
                $scope.users = data.data;
                console.log(data.data);
            });
            req.error(function(data, status, headers, config) {
                console.log(data.result)
            });
        }

        // update
        $scope.update = function(){
            var user = JSON.parse(sessionStorage.getItem("User"));
            var req = $http.post('http://127.0.0.1:3000/update',
                {   _id : user.data._id ,
                    First_Name:$scope.first_name,
                    Last_Name:$scope.last_name,
                    Email_Id:$scope.email_id,
                    Phone:$scope.phone_number
                }
                );
            req.success(function(data, status, headers, config) {
                alert("Details Updated")
                console.log(data.data);
                sessionStorage.setItem("User", JSON.stringify(data));
            });
            req.error(function(data, status, headers, config) {
                console.log(data.result)
            });

        }

        // delete
        $scope.remove = function(user) {
            var req = $http.post('http://127.0.0.1:3000/delete',user)
            req.success(function(data, status, headers, config) {
                console.log(data.result);
                window.location.href = "home.html";
            });
            req.error(function(data, status, headers, config) {
                console.log(data.result)
            });
        }

        // edit the user details as admin
        $scope.edit = function(user) {
            var req = $http.post('http://127.0.0.1:3000/update',user)
            req.success(function(data, status, headers, config) {
                console.log(data.result);
                window.location.href = "home.html";
            });
            req.error(function(data, status, headers, config) {
                console.log(data.result)
            });
        }
        //Logout
        $scope.logout = function() {
            console.log("hello")
            sessionStorage.removeItem("User");
            window.location.href = "index.html";
        }

    });