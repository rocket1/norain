No Rain (norain.co)

A simple NodeJS/Express API that will return locations of sunny cities within some radius of a location.

After finding cities (pop >  15,000) around a particular location, it uses the Open Weather free web service to get weather data.







-------------------------------

EVERYTHING BELOW IS OLD OLD OLD but hanging on to it in case I want to revisit a command line interface.

A utility for finding cities nearby that have no rain in the forecast.

Options (may) include:

* Radius in miles or kilometers.
* Starting location other than current location.
* Specify an activity (hiking, horse back riding, beach, etc).
* Specify a date range, that of course will be less accurate further in time.




%> norain

                                          Local Weather

                 mon 9   tues 10   wed 11   thur 12   fri 13   sat 14   sun 15   mon 16   tue 17
------------------------------------------------------------------------------------------------
Portland         @ ~      /        ~         *!        *       @ ~       ~ *     ~        /!
                 76 23    79 33    101 22    76 23     79 33   101 22    76 23   79 33    101 22

Miliwauki        @ ~      /        ~         *!        *       @ ~       ~ *     ~        /!
                 76 23    79 33    101 22    76 23     79 33   101 22    76 23   79 33    101 22

Oregon City      @ ~      /        ~         *!        *!!!    @ ~       ~ *     ~        /!
                 6 23     79 33    101 22    76 23     79 33   101 22    76 23   79 33    101 22

Tillamook        @ /      @         /        ~         @       @ ~       ~ *     ~      n /
                 6 23     79 33    101 22    76 23     79 33   101 22    76 23   79 33    101 22

@ Sunny
~ Cloudy
@ ~ Partly Cloudy
/ Rainy
* Snowy
= Windy
# Foggy

! Emphasis, e.g.

@! Really sunny
@!! Really, really, sunny and probably hot
*! Heavy snow
#! Really foggy, probably low visibility
*!!! Powerful snow storm
=!!! Hurricane

norain by jason frinchaboy.

%>


