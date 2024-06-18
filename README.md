## Discover a Day in History

This project is a search application of historical facts based on date selected,
the information source is the wikimedia api featured feeds.


To run the project, please follow these steps:

1. Ensure that Docker is installed on your machine.
2. Open a terminal or command prompt.
3. Navigate to the root directory where the `docker-compose.yml` file is located.
4. Execute the command `docker-compose up` to start the containers defined in the compose file.
5. Wait for the containers to start and for any necessary dependencies to be downloaded.
6. Once the containers are up and running, you can access your application using the specified ports or URLs.

That's it! You have successfully run the Docker Compose for this project. To stop the containers, use the command `docker-compose down` when you're finished.

frontend:
http://localhost:8100

backend:
http://localhost:8000

translate service:
http://localhost:5000
