# Ytimer 

## Global presentation of the project


This extension is designed for Ynov students.
The extension will show the student in many ways the time left before the end of an assignement.

It will be presented as described in the following. 

- A list of assignements containing the following information about each assignement :
    - The title of the assignement
    - The time left before the deadline of the assignement
    - A link redirecting to the website where the assignement must be submitted
    - A button to indicate that you've completed the assignement

- A button on the top allowing to filter the assignements. 

An assignement is higlighted considering the time left before the deadline : 
- Green if there is more than 1 week left 
- Yellow if there is more than 2 days left 
- Red if there is less than 2 days left 


The goal here is to be able to see all the deadlines of a student in one place. The objective is to be able to see easily the task that must be done and how far from the deadline we are. 


## Setup guide 

### Prerequisite for the use of the extension :

- Node.JS version 20.18
- Composer version TODO
- Database that can be downloaded on this link TODO

### Installation : 

To install the extension, you must first dowload this repository and the one at LINK TODO
Then, you must install the server and the client.

- Server :
    Import the database that is prepared on the other git repository locally.

    In the server folder, use command :
    ```
    $ composer install
    ``` 
    
    Then :
    ```
    $ symfony server:start
    ```
    

- Client : 

    In the client folder, use command :
    ```
    $ npm install
    ``` 

    Run the extension in this environment using :
    ```
    $ npm start
    ```  

## How to use Ytimer  

Connect to the extension and then, the application will match the tag of your profile with the courses that you have and will automatically look for the assignements that you have left. TODO

You can then see on the right of the assignement title, the time left before the deadline.

Once you completed an assignement, you can use the button on the left of the corresponding assignement to indicate that it is done, and then this assignement "won't be shown anymore". TODO

## What was really developped and functionnal TODO (at the end of the project)

Along with the web extension is a back-end administration where you can manage the assignements, tag them for a particular group of student. This API allows to manage the assignements (add, delete, modify them). It returns a JSON that is fetched by the extension and used to display the assignements where the deadline isn't met yet. 

## Technologies used for the project TODO

We used a React framework named WXT specialized for web extensions for the front-end. The component-based utilisation was adapted to what we wanted to develop (Many assignements with the same structur).

We used the Symphony framework for the back-end. It allows us to gather the data from a database and to sort them by datetimes before sending it to the front-end, thus simplifying the work in front. 
