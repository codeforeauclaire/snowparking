Solving the Eau Claire snow parking issue, preventing tickets one ticket at a time

## Proposed API

### GET /status

For consumption by front end applications to get the current snow parking status

```
{
	alternateSideParking: even|odd|false,
	startTime: timestamp|false,
	endTime: timestamp|false
}
```

### GET /schedule

For consumption by front end applications to get projected snow parking statuses

```
[
	{
		alternateSideParking: even|odd|false,
		startTime: timestamp,
		endTime: timestamp
	},
	...
]
```

### POST /notification

Collect notifications emails from http://eauclairewi.gov/about-us/sign-up-for-e-notifications and place them in our database

```
{
  subject: (email subject)
  body: (email body)
  received: timestamp
}
```

## Proposed API Infrastructure

We gotta pick something.  This is close to what I, Anthony, am currently working with and propose we use it.

* node.js - Scalable will takes lots of hits creating an API. No need for a full MVC stack.
* MongoDB - Simple data store, could be anything really.  Will scale well enough.
* IFTTT - Connector to get from Email to our app
 * This: https://ifttt.com/email (Inbound email setup for subscription from http://eauclairewi.gov/about-us/sign-up-for-e-notifications)
 * That: https://ifttt.com/maker (To make an HTTP call to our application)
* AWS Free tier - Run everything on a single server.  Good for one year.
 
## Proposed API database structure

### Notifications
```
{
  subject: (email subject)
  body: (email body)
  received: timestamp
}
```

## Proposed API internal application methods

Quick to code and dirty to start.  Optomize later iff needed.

### Method: ParseNotification(notfication)

Return: Array of objects defining alternate side parking like this (Relating to a single notification):
```
[
	{
		alternateSideParking: even|odd|false,
		startTime: timestamp,
		endTime: timestamp
	},
	...
]
```

### Method: GetSchedule()

Calls ParseNotification over all recent notifications in the database.

* Removes duplicates / smart choice of most recent notification
* Sorts schedule results newest first

Return: Array of objects defining alternate side parking like this (Relating to a all recent notifications):
```
[
	{
		alternateSideParking: even|odd|false,
		startTime: timestamp,
		endTime: timestamp
	},
	...
]
```

## Proposed API endpoint implementation

### GET /status

1. Call ```GetSchedule(...)``` 
2. Output if any results are in the current time frame

### GET /schedule

1. Call ```GetSchedule(...)``` 
2. Output all schedule results

### POST /notification

1. Call ```ParseNotification(...)``` 
2. Store result in MongoDB as JSON object
