/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    init: function() {        
        console.log("Inside initialize function");
        
        $("#loginFrm").submit(this.validateUserInfo);
        //$(document).on("#searchFrm", "submit", this.getSearchDetails);
        //$("#searchFrm").submit(this.getSearchDetails);
        $("#searchFrm").on('submit', this.getSearchDetails);
        $("#uploadLnk").click(function(){
            $("#uploadInfoContainer").show();
            $(this).hide();
        });
        $("#uploadFrm").submit(this.uploadFile);
      
    },
    
    validateUserInfo: function(e) {
        
            console.log("Inside validateInfo");
            
            var emailVal = $('#emailField').val();
            var passwordVal = $('#passwordField').val();

            
            $.getJSON("http://elicitdesignzsolutions.com/actorama_json/actorama_login.php?callback=", 
                {
                    email: emailVal,
                    password: passwordVal
                }, 
                function(data){
                
                if(data.result == "Successfully logged in") {
                    //TODO ask engineer to send the loginValue
                    //localStorage.setItem('login', emailVal);
                   $.mobile.changePage(("search.html"), {transition: "slide"}); 
                }

                if(data.result == "Invalid Login" || data.result == "Data missing") {
                    $.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, "Invalid UserName or password", true );
                    setTimeout( $.mobile.hidePageLoadingMsg, 2500 );                    
                }
                
            });

        return false;            
    },

    getSearchDetails: function(){
        
        //Getting the search input field value
        var searchFieldVal = $("#searchField").val();
    
        $.getJSON("http://elicitdesignzsolutions.com/actorama_json/virtual_casting.php?title="+searchFieldVal, function(data){
                
                /*if(data.result[0] == "data not found") {
                   $.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, "No Results Found", true );
                    setTimeout( $.mobile.hidePageLoadingMsg, 2500 );                    
                } else {*/
                    //alert("Response recieved");
                    $("#searchNotes").text(data.notes_guide);
                    $("#searchSlides").text(data.slides);                    
                    $.mobile.changePage("#uploadPage", {transition : "slide"});                    
                /*}*/                
            });
        return false
        },
    uploadFile: function(){        
        var emailVal = $("#emailField").val();
        var passwordVal = $("#passwordField").val();

    }

    };

$(document).on('pageinit', function(){        
        app.init();
});
