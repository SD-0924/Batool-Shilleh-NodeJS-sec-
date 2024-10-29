# File Management REST API

👩‍💻 **Project Overview**  
In this project, you will create a RESTful API using Node.js, Express.js, and various Node modules to manage files. The API will allow users to perform basic file operations like listing, creating, reading, updating, and deleting files.

## Description
The application will allow users to perform the following actions:
- **List all files** in the "data" directory on the homepage.
- **Create a new file** with a specified name and content.
- **View the content** of a specific file by clicking on its name.
- **Update/Modify** the name of a file.
- **Delete a file**.

## API Structure
You can use any type of API structure you find suitable, but always provide good arguments for your chosen structure/pattern. Here is a suggested structure:

```
project-directory/
  ├── server.js
  ├── views/
  │   ├── index.ejs
  │   ├── create.ejs
  |   ├── search-results.ejs
  |   ├── upload.ejs
  │   └── detail.ejs
  |
  ├── controllers
  |   └── fileController.js
  |
  ├── middleware
  |   └── loggingMiddleware.js
  |
  ├── router
  |   └── fileRoutes.js
  |
  ├── public/
  │   ├── styles.css
  │   └── scripts.js
  |
  ├── test
  |   └── fileController.test.js
  |
  |
  └── data/
```

## Bonus Tasks
In case you finish all of the above before the schedule, consider adding one or some of the following features to the project:
- **File Upload**: Users can upload files to the server.
- **File Retrieval**: Users can retrieve a list of uploaded files and download individual files.
- **File Search**: Implement a search functionality to allow users to search for files by name or metadata.
- **File Compression**: Provide an option for users to compress files before uploading or download compressed files.
- **File Encryption**: Implement file encryption for added security during storage and transmission.

### Simple Gate - Bonus
To provide automated testing for your system, implement the following:
- Design & Implement a list of unit tests that cover your system (Backend Focused).
- Use GitHub Actions to create an automatic job that runs per commit and checks if you are inserting proper code each time. The job should be triggered per each commit and run all of the unit tests you implemented earlier. It should provide an indication of your repo (or any other indication of your choice) whether the last commit based/broke the pipeline.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
