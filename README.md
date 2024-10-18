# YTimer 

## Global presentation of the project


This extension is designed for Ynov students.
The extension will show the student in many ways the time left before the end of an assignement.

It will be presented as described in the following. 

- A list of assignements containing the following information about each assignement :
    - The title of the assignement
    - The time left before the deadline of the assignement
    - A link redirecting to the website where the assignement must be submitted
    - A button to indicate that you've completed the assignement

An assignement is higlighted considering the time left before the deadline : 
- Green if there is more than a week left 
- Yellow if there is less than a week left 
- Red if there is less than 2 days left 


The goal here is to be able to see all the deadlines of a student in one place. The objective is to be able to see easily the task that must be done and how far from the deadline we are. 


## Setup guide 

### Prerequisite for the use of the extension :

- Node.JS version 20.18 (with npm 10.9)
- Composer
- PHP version 8.1
- Database that can be downloaded on this link https://github.com/hippot02/hackaton_ynov_back
- XAMPP 

### Installation : 

To install the extension, you must first dowload this repository and the one at https://github.com/hippot02/hackaton_ynov_back.

Then, you must install the server and the client.

- Server :
    Import the database that is prepared on the previously linked git repository locally.

    Download and import ynovback.sql

    Modify your .env with your database URL. 

    In the server folder, use command :
    ```
    $ composer install
    ``` 

    Then :
    ```
    $ symfony serve
    ```
    

- Client : 

    In the client folder, use command :
    ```
    $ npm install
    ``` 

    Run the extension in this environment using :
    ```
    $ npm run dev
    ```  

## How to use YTimer  

Connect to the extension and then, the application will automatically look for the assignements that you have left. 

You can then see within an assigment card the assignement title, the time left before the deadline.

Once you completed an assignement, you can use the button on the right of the corresponding assignement to indicate that it is done, and then this assignement will be shown in grey.

NOTE : the 'done' button is purely for personal use, in order to remember which assignments you have already done.

## What was really developped and functionnal 

Along with the web extension is a back-end administration where you can manage the assignements and tag them for a particular group of students. This API allows to manage the assignements (add, delete, modify them). It returns a JSON sorted by time left before deadline. The back-end also don't send the assignements if the deadline is already passed or if the assignement is manually marked as "inactive". 

On the front-end, the extension can be opened from an internet navigator, it shows the assignements with their titles, the deadline date and the time left before the deadline. Moreover, each assignement is colored as explained in the first section of this document.


## Technologies used for the project 

We used the **WXT** framework specially made for browser extension development, which was setup to use **React** as a client framework as the component-based utilisation was adapted to what we wanted to develop.

We used the PHP-based **Symfony** framework for the back-end. It allows us to gather the data from a local database and to sort them by datetimes before sending it to the front-end, thus simplifying the work in front. 
