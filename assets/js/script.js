var jobsToApplyEl = document.querySelector("#jobs-in-review");
var buttonEl = document.querySelector("#add-job");
var jobIdCounter = 0;
var pageContentEl = document.querySelector('#page-content');

//Data collected from the Modal
var date_posted = document.querySelector("#date_posted");
var job_position = document.querySelector("#job_position");
var job_link = document.querySelector("#job_link");

var createJobHandler = function () {
  var jobItemEl = document.createElement("li");
  jobItemEl.className = "job-item";

  //add task id as a custom attribute
  jobItemEl.setAttribute("data-job-id", jobIdCounter);

  var jobInfoEl = document.createElement("div");
  jobInfoEl.innerHTML = "<li class='job-item'> Date posted: " + date_posted.value +"<br /> Job position: " 
  + job_position.value + "<br /> Job link: " + job_link.value + "</li>";  

  jobItemEl.appendChild(jobInfoEl);

  //adding the edit and delete buttons in
  var jobActionsEl = createJobActions(jobIdCounter);
  jobItemEl.appendChild(jobActionsEl);

  // Add the entire item to the list
  jobsToApplyEl.appendChild(jobItemEl);

  //increase job counter for next unique id
  jobIdCounter++;
};

var createJobActions = function(jobId){
  var actionContainerEl = document.createElement('div');
  actionContainerEl.className = "job-actions";

  //create edit button
  var editButtonEl = document.createElement('button');
  editButtonEl.textContent = 'Edit';
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute('data-job-id', jobId);

  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement('button');
  deleteButtonEl.textContent = 'Delete';
  deleteButtonEl.className = 'btn delete-btn';
  deleteButtonEl.setAttribute('data-job-id', jobId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement('select');
  statusSelectEl.className = 'select-status';
  statusSelectEl.setAttribute('name', 'status-change');
  statusSelectEl.setAttribute('data-job-id', jobId);
  
  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ['In review', 'Jobs to Apply to', 'Already applied'];

  for(var i=0; i<statusChoices.length; i++){
    //create option element
    var statusOptionEl = document.createElement('option');
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute('value', statusChoices[i]);
    
    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var deleteJob = function(jobId){
  var jobSelected = document.querySelector(".job-item[data-job-id='" + jobId + "']");
  jobSelected.remove();
}

var editJob = function(jobId){
  //get job list item element
  var jobSelected = document.querySelector(".task-item[data-task-id='"+jobId+"']");

  //get content from posted date, job link and job position
  var job
}

var jobButtonHandler = function(event){ 
  console.log(event.target);

  if (event.target.matches(".delete-btn")){
    //get target element from event
    var targetEl = event.target;
    
    //edit button was clicked
    if(targetEl.matches(".edit-btn")){
      var jobId = targetEl.getAttribute('data-job-id');
      editJob(jobId);
    }
    
    //delete button was clicked
    else if (targetEl.getAttribute('.delete-btn')){
      var jobId = targetEl.getAttribute('data-job-id');
      deleteJob(jobId);
    }
  }
};

buttonEl.addEventListener("click", createJobHandler);
pageContentEl.addEventListener("click", jobButtonHandler);
