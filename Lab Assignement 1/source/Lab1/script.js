var app = angular.module("knowledgeApp", ["ngSanitize"]);
app.controller("knowledgeController", function($scope,$http) {
    "use strict";

    // Knowledge Graph Api
    $scope.getDetails = function(){
        $("#inputError").hide();
        $("#apiEmptyError").hide();
        var inputText = $scope.inputTexttoSearch;
        if (inputText === null || $.trim(inputText) === ""){
            // Throw error
            $("#inputError").show();
            // Stop flow
            return false;
        }
        $http.get("https://kgsearch.googleapis.com/v1/entities:search?" +
            "key=AIzaSyDT4XvxKUbvC0mautp3mQcOz5wyaQQnXQk&limit=3&" +
            "indent=True&query=" +inputText).success(function(data) {
            $scope.dataDisplay = data.itemListElement;
            if ($scope.dataDisplay.length<1) {
                // Throw Error
    var errorMsg = "No knowledge graph records " +
        "found for the input text : " +inputText;
                $("#apiEmptyError").html(errorMsg).show();
                return false;
            }
        });
    };
    // Face Detection
    $scope.faceDetection = function(imageUrl) {
        // Hiding all errors first
        $("#inputError").hide();
        $("#apiEmptyError").hide();
        $scope.faceDetectionArray = [];
        $http.post("https://api-us.faceplusplus.com/facepp/v3/detect?" +
            "api_key=K924MXKS7UDNHWdEmzuKiUKjJOvHQk1F&" +
            "api_secret=mt3aCMjbw7jjuBm_AiUuQTn6fKxUrXs3&" +
            "return_attributes=gender,age,ethnicity&image_url="
            +imageUrl).success(function(data) {
            $scope.faceDetectionArray = data.faces;
            if ($scope.faceDetectionArray.length<1) {
                // Throw Error
                var errorMsg = "No Details Found";
                $("#faceApiError").html(errorMsg).show();
                return false;
            }
        });
    };

    $scope.formSubmit= function () {
        if($scope.fname){
            $("#message").show();
            $(".submitForm").hide();
        }
    };
});
