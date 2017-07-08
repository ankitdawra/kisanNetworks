App.controller('BaseCtrl', ['$scope', '$rootScope', 'IO', '$location',
    function ($scope, $rootScope, IO, $location) {
         
         //toastr options global initalization to display error success
         toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-bottom-left",
          "preventDuplicates": true,
          "onclick": null,
          // "showDuration": "300",
          // "hideDuration": "1000",
          "timeOut": "5000",
          // "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "slideDown",
          "hideMethod": "fadeOut"
        }

        //handling state change start
        $rootScope.$on('$stateChangeStart', function(event, current, currentParams, previous, previousParams){
            $rootScope.currentState = current;
        });
        
        //fetching contacts
        IO.getContacts(function(res){
            $rootScope.contacts = res;
        });


        $rootScope.openUser = function(contact){
            if(contact){
                url = '/user/'+contact.fname+'/'+contact.id;
                $location.url(url);
            }
        }

        $rootScope.findUser = function(id){
            if(!angular.isUndefined(id)){
                contactList = $rootScope.contacts;
                for (var i = 0; i < contactList.length; i++) {
                    if(contactList[i].id == id){
                        return contactList[i];
                    }
                }
                return false;
            }
            return false;
        }

        $rootScope.openContacts = function(){
            $location.url('/contacts');
        }

        $rootScope.openMessages = function(){
            $location.url('/messages');
        }

    }
]);