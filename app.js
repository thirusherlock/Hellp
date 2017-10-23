var app = angular.module('MyApp',['ui.router']);
app.service("sample",function(){
this.activitydetails = [
{
name: 'Meeting',
description: 'Hello'
},
{
name: 'Meeting1',
description: 'Hello'
},
{
name: 'Report',
description: 'Hello'
}
];
this.company = [
{
name: 'TTS'
},
{
name:'Atribs'
},
{
name:'TCS'
}
];
this.details = [
{
id: '1',
companyname: 'TTS',
taskname: 'Meeting',
startdate: '23/12/2016',
enddate: '20/4/2017',
assigned: 'Sayee',
status: 'Completed',
description: 'Hello',
owner: 'Sambu',
priority: 'High',
comment: 'This is a test message'
},
{
id: '2',
companyname: 'Atribs',
taskname: 'Meeting',
startdate: '20/1/2017',
enddate: '24/4/2017',
assigned: 'Sanjay',
status: 'Completed',
description: 'Hello',
owner: 'Sambu',
priority: 'High',
comment: 'This is a test message'
},
{
id: '3',
companyname: 'TCS',
taskname: 'Phone Call',
startdate: '19/01/2017',
enddate: '20/10/2017',
assigned: 'Sayee',
status: 'In Progress',
description: 'Hello',
owner: 'Sambu',
priority: 'High',
comment: 'This is a test message'
},
{
id: '4',
companyname: 'Atribs',
taskname: 'Phone Call',
startdate: '30/12/2016',
enddate: '30/4/2018',
assigned: 'Sai',
status: 'In Progress',
description: 'Hello',
owner: 'Sambu',
priority: 'High',
comment: 'This is a test message'
},
{
id: '5',
companyname: 'TTS',
taskname: 'Meeting',
startdate: '23/12/2018',
enddate: '20/4/2019',
assigned: 'Sayee',
status: 'New',
description: 'Hello',
owner: 'Sambu',
priority: 'High',
comment: 'This is a test message'
},
{
id: '6',
companyname: 'TCS',
taskname: 'Meeting',
startdate: '23/12/2016',
enddate: '20/4/2017',
assigned: 'Sayee',
status: 'Completed',
description: 'Hello',
owner: 'Sambu',
priority: 'High',
comment: 'This is a test message'
},
];
})
app.config(function($stateProvider,$urlRouterProvider){
$urlRouterProvider.when('/','/login').otherwise('/');
$stateProvider
.state('index',{
url:'/',
templateUrl: 'index.html'
})
.state('login',{
url:'/login',
templateUrl:'login.html',
controller: 'loginController'
})
.state('register',{
url:'/register',
templateUrl:'register.html',
controller:'registerController'
})
.state('table',{
url: '/details',
templateUrl: 'table.html',
controller:'tableController'
})
.state('choice',{
url: '/choice',
templateUrl: 'choice.html'
})
.state('task',{
url:'/task',
templateUrl: 'task.html',
controller: 'taskController'
})
.state('activity',{
url:'/activity',
templateUrl:'activity.html'
})
.state('task.basicinfo',{
url:'/details',
templateUrl:'basicinfo.html',
controller: 'taskController'
})
.state('view',{
url:'/details/:id',
templateUrl: 'view.html',
controller:'tableController'
})
});
app.controller('loginController',function($scope,$state){
$scope.login = function(user)
{
var username = $scope.user.email;
var password= $scope.user.password;
var auth = firebase.auth();
console.log(auth);
firebase.auth().signInWithEmailAndPassword(username, password).then(function(username) {
  $state.go('table');
  console.log(username);
 console.log("Authentication Successful");
});
firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
}
});
app.controller('registerController',function($scope,$state){
$scope.register = function(user1)
{
var uname = $scope.user1.email;
var pass = $scope.user1.password;
firebase.auth().createUserWithEmailAndPassword(uname,pass).then(function(uname){
$state.go('login');
window.alert('Registered Successfuly');
});
}
});
app.controller('tableController',function($scope,$state,sample,$stateParams){
$scope.details = sample.details;
if($state.current.name=='view')
{
$scope.details = sample.details;
var x = $stateParams;
angular.forEach($scope.details,function(detail){
if(x.id == detail.id)
{
$scope.detail = detail;
console.log($scope.detail);
}
});
}
});

app.controller('taskController',function($stateParams,$scope,sample,$state){
$scope.activitydetails = sample.activitydetails;
var activitydetails = $scope.activitydetails;
$scope.company = sample.company;
if($state.current.name=='task')
{
$scope.comp = function(name)
{
$state.go('task.basicinfo');
}

}
});