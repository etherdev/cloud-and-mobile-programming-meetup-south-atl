# Ruby Installation and Setup

These instructions should get you up and running on your local machine for development and testing purposes. 

## Instructions for OSX

Open the Terminal app to run the install and configuration commands below.

### Install Homebrew

First, you need to install [Homebrew](http://semver.org/)

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install and Configure RVM

Next, install Ruby Version Manager [RVM](https://rvm.io/rvm/install), which will also install Ruby and RubyGems.

```
\curl -sSL https://get.rvm.io | bash -s stable --ruby
```

Then install version 2.3.7

```
rvm install 2.3.7
```

Next, set version 2.3.7 as your default

```
rvm --default use 2.3.7
```

Finally, create a gemset to hold the gems you install for the project

```
rvm gemset create meetup
```

And set your terminal to use the gemset

```
rvm use 2.3.7@meetup
```

### Install PostgreSQL

Install [PostgresApp](https://postgresapp.com/). Click download at the site and install to your applications.

Next, install the [Command Line Tools](https://postgresapp.com/documentation/cli-tools.html).

You may need to close your Terminal window and open a new one for the changes to take affect. Any time you open a new Terminal window, you need to reset your rvm gemset again:

```
rvm use 2.3.7@meetup
```

See the After Install instructions below to run the app.

## Instructions for Windows

The following are untested by me, but should get you up and running on Windows. You also have the option of installing a Virtual Machine and running Ubuntu on Windows. Many also seem to be using Docker, which has a nice video tutorial here:

[Docker Ruby Setup For Windows](https://www.driftingruby.com/episodes/intro-to-docker-on-windows)

That will install the Ruby on Rails framework, which we are not using, but it has most of the same setup needs. And it won't hurt to have it to play with. Note, we are using Ruby 2.3.7 currently, so you may want to install that than the version in the example.

If you find that Docker will not work for you, try some of these options below for running Ruby in the Windows environment.

### CMDER for older than Windows 10

Windows 10 and higher apparently have a pretty good command line tool built in that works with linux apps. But if you are on an an older version, try:

[CMDER](http://cmder.net/)

### Install Ruby with Ruby Installer for Windows

Download Ruby Installer and follow the documentation to install version 2.3.7. This should also install the RubyGems package manager:

[Ruby Installer for Windows](https://rubyinstaller.org/)

### Install URU

URU helps you to manage multiple versions of Ruby on Windows.

[URU Ruby Manager for Windows](https://bitbucket.org/jonforums/uru/src/master/)

You should be able to register the version of ruby you installed above with URU. If you install other versions, register them as well. Then follow the directions to switch between them.

### Install PostgreSQL

Install [PostgreSQL for Windows](https://www.postgresql.org/download/windows/). This will include a graphical interface you can use to drop, create and view your database.

## Running App

Once everything is installed, from the command line, navigate to the directory of this project.

### Install Bundler

Bundler is a gem that conveniently manages our package installs. You must first install it from the command line:

```
gem install bundler
```

### Run the Bundle command

Next, you can run the bundle command:

```
bundle
```

This should install all the gems we'll be using for the project. If you run into errors and need help, email me at ryan@websuasion.com.

### Create your database

If you are using PostgresApp for mac with the commend line tools, run:

```
createdb meetup_api
```

Likewise, you can drop (delete) your database with:

```
dropdb meetup_api
```

Likewise, you can use the pgAdmin UI and add or drop your database as well.

In the files for both the *config.ru* and *pry.rb* files, you will need to change your username for postgres:

```
DataMapper.setup(:default, 'postgres://yourusername:@localhost/meetup_api')
```

### Start the Server

Next, we just need to start the server up:

```
rerun "puma  ./config.ru"
```

You can now hit the server with any HTTP Client. I recommend using [Postman](https://www.getpostman.com/)

### Exploring your objects in Pry

You can also start up your app with Pry and explore your classes and objects from the command line.

```
pry -r ./pry.rb
```

Once it starts, you can try the following to see that it's working:

```
cd User
ls
```

## Videos

Follow along with the videos here:

https://www.facebook.com/pg/websuasion/videos/