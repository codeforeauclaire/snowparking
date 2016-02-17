Solving the Eau Claire snow parking issue, preventing tickets one ticket at a time

## API

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
	}
]
```

### POST /notification

Collect notifications emails from http://eauclairewi.gov/about-us/sign-up-for-e-notifications

```
{
  subject: (email subject)
  body: (email body)
  received: timestamp
}
```

## Proposed Infrastructure

We gotta pick something.  This is what I, Anthony, am currently working with and propose we use it.

* node.js - Scalable will takes lots of hits creating an API
* MongoDB - Simple data store, could be anything really.  Will scale well enough.
* IFTTT - Connector to get from Email to our app
** This: https://ifttt.com/email (Inbound email setup for subscription from http://eauclairewi.gov/about-us/sign-up-for-e-notifications)
** That: https://ifttt.com/maker (To make an HTTP call to our application)