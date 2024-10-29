function asyncTask(success) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve("Task completed successfully!");
        } else {
          reject("Task failed.");
        }
      }, 2000);
    });
  }
  
  asyncTask(true)
    .then(result => console.log(result))  // Output after 2 seconds: Task completed successfully!
    .catch(error => console.log(error));  // If success was false
  
/*
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())  // Convert the response to JSON
  .then(data => console.log(data))    // Handle the data from the server
  .catch(error => console.error(error));  // Handle any errors
*/
/*
myPromise
  .then((result) => {
    console.log(result);  // Output: Operation was successful
  })
  .catch((error) => {
    console.error(error);  // If the operation failed
  })
  .finally(() => {
    console.log("Promise has been settled (fulfilled or rejected).");
  });
*/
/*
let myPromise = new Promise(function(resolve, reject) {
    // Perform some asynchronous operation
    let success = true;  // Simulate success or failure
    
    if (success) {
      resolve("Operation was successful");
    } else {
      reject("Operation failed");
    }
  });
*/  