
import L from 'leaflet'
import Handlebars from 'handlebars'
import Parse from 'parse'
import Split from 'split.js'
import Pikaday2 from 'pikaday2'

Parse.initialize("jfEekOu1UDd6u7ugQdNYvApXPiWO704gZtirmhH2", "Rs6cdM9lQr7t0vVQpXjRN4lo4oVRlCCLL00M0KG9");

Split(['#map', '#list'], {
    sizes: [80, 20],
    minSize: [200, 300]
})

$('.popup-link').click(function (e) {
    e.preventDefault()
    $('.modal').hide()
    $($(this).attr('href')).show()
})

$('.modal .leaflet-popup-close-button').click(e => {
    e.preventDefault()
    $('.modal').hide()
})

$('#addtree').click((e) => {
    e.preventDefault()

    if (currentUser && currentUser.get('property')) {
        $('#tree').show()
    } else {
        $('#property').show()
    }
})

let ripeningdate = new Pikaday2({
    field: document.getElementById('ripeningdate'),
    format: 'MMM Do'
})

$("input[name='phone']").mask("(999) 999-9999")

const popupTemplate = Handlebars.compile(document.getElementById('popup-template').innerHTML);

const map = L.map('map').setView([40.02, -105.28], 13)
const tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'ezwelty.o7g2lf5a',
    accessToken: 'pk.eyJ1IjoiZXp3ZWx0eSIsImEiOiJjaWg4a3pydHQwdGhqdjBraTFuMHl1ZGtwIn0.2IQ6qEI9JLOhEhioS77huA'
}).addTo(map)

const Species = Parse.Object.extend('Species')
const Property = Parse.Object.extend('Property')
const Harvest = Parse.Object.extend('Harvest')
const Tree = Parse.Object.extend('Tree')

const harvestJoin = function (e) {
    e.preventDefault()

    let harvestId = $(this).data('harvest')
      , query = new Parse.Query(Harvest)

    query.get(harvestId, {
        success: harvest => {
            if (currentUser) {
                // TODO: Add harvest signup

                $(this).html('Joined <i class="fa fa-check-circle" style="vertical-align: baseline"></i>').attr('disabled', 'disabled').addClass('disabled')
                $(this).unbind('click', harvestJoin)
            } else {
                $('#join h3').text('Join ' + harvest.get('name'))
                $('.modal').hide()
                $('#join').show()
            }
        },
        error: (harvest, error) => {
            // TODO: Handle error
        }
    })
}

let query = new Parse.Query(Species)

query.select(["objectId", "name", "scientific_name"])
query.limit(1300)
query.find({
    success: species => {
        document.getElementById('species').innerHTML = species.map(spec => `
                <option value="${spec.id}">
                    ${spec.get('name')} ${spec.get('scientific_name') ? '[' + spec.get('scientific_name') + ']' : ''}
                </option>
            `
        ).join('')
    },
    error: error => {
        document.getElementById('species').innerHTML = '<option>Could not load species.</option>'
    }
})

query = new Parse.Query(Harvest)

query.include('property')
query.find({
    success: harvests => {
        document.getElementById('harvests').innerHTML = harvests.map(harvest => `
                <tr>
                    <td>
                        ${harvest.get('name')}
                        <br>
                        <span style="font-weight: normal">
                            ${harvest.get('property').get('address')}
                        </span>
                    </td>
                    <td>
                        ${moment.utc(harvest.get('date')).format('MMM Do')}
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline popup-link" data-harvest="${harvest.id}">
                            Join
                        </button>
                    </td>
                </tr>
            `
        ).join('')

        $('#harvests .popup-link').bind('click', harvestJoin)
    }
})

query = new Parse.Query(Tree)

query.include('species')
query.limit(500)
query.find({
    success: trees => {
        for (let tree of trees) {
            if (tree.get('latlng')) {
                let latlng = tree.get('latlng')
                  , species = 'Unknown'
                  , harvest_pounds = tree.get('harvest_pounds') || 'Unknown'
                  , height_feet = tree.get('height_feet') || 'Unknown'
                  , sprayed = tree.get('sprayed') || 'Not sure'

                if (tree.get('species')) {
                    species = tree.get('species').get('name')
                }

                L.circleMarker([latlng.latitude, latlng.longitude], {radius: 7, fillColor: '#6CC644', fillOpacity: 1})
                    .addTo(map)
                    .bindPopup(popupTemplate({
                        title: species,
                        date: moment.utc(tree.get('harvest_date')).format('MMM Do'),
                        yield: harvest_pounds,
                        height: height_feet,
                        sprayed: sprayed
                    }))
            }
        }
    }
})

let currentUser = Parse.User.current()
  , signinForm = document.querySelector('#signin form')
  , signupForm = document.querySelector('#signup form')
  , propertyForm = document.querySelector('#property form')
  , propertysignupForm = document.querySelector('#propertysignup form')
  , joinForm = document.querySelector('#join form')
  , joinsignupForm = document.querySelector('#joinsignup form')
  , treeForm = document.querySelector('#tree form')
  , signoutUI = () => {
    document.getElementById('unauthenticated').style.display = 'block'
    document.getElementById('authenticated').style.display = 'none'
}
  , signinUI = () => {
    document.getElementById('unauthenticated').style.display = 'none'
    document.getElementById('authenticated').style.display = 'block'
}
  , signin = e => {
    e.preventDefault()

    Parse.User.logIn(signinForm.email.value, signinForm.password.value, {
        success: user => {
            currentUser = user
            signinUI()
            signinForm.reset()
            $('.modal').hide()
        },
        error: (user, error) => {
            // TODO: Handle errors in from
        }
    })
}
  , signup = e => {
    e.preventDefault()

    let user = new Parse.User()
    user.set('username', signupForm.email.value)
    user.set('email', signupForm.email.value)
    user.set('password', signupForm.password.value)
    user.set('fullname', signupForm.fullname.value)
    user.set('phone', signupForm.phone.value)

    user.signUp(null, {
        success: user => {
            currentUser = user
            signinUI()
            signupForm.reset()
            $('.modal').hide()
        },
        error: (user, error) => {
            // TODO: Handle errors in form
        }
    })
}
  , tree = e => {
    e.preventDefault()

    if (currentUser && currentUser.get('property')) {
        let t = new Tree()

        query = new Parse.Query(Species)
        query.get(treeForm.species.value, {
            success: species => {
                let p = currentUser.get('property')

                t.set('height_feet', parseFloat(treeForm.height.value))
                t.set('harvest_pounds', parseFloat(treeForm.yield.value))
                t.set('harvest_date', ripeningdate.getDate())
                t.set('sprayed', treeForm.sprayed.value)
                t.set('property', p)
                t.set('species', species)

                $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + p.get('address') + ', ' + p.get('city') + ', ' + p.get('state') + ' ' + p.get('zip'), data => {
                    let location = data['results'][0]['geometry']['location']

                    t.set('latlng', new Parse.GeoPoint([location.lat, location.lng]))

                    t.save(null, {
                        success: (t) => {
                            treeForm.reset()
                            $('.modal').hide()

                            L.circleMarker([location.lat, location.lng], {radius: 7, fillColor: '#6CC644', fillOpacity: 1})
                                .addTo(map)
                                .bindPopup(popupTemplate({
                                    title: species.get('name'),
                                    date: moment.utc(t.get('harvest_date')).format('MMM Do'),
                                    yield: t.get('harvest_pounds'),
                                    height: t.get('height_feet'),
                                    sprayed: t.get('sprayed')
                                }))
                        },
                        error: (t, error) => {
                            // TODO: Handle errors in form
                        }
                    })
                })
            },
            error: (species, error) => {
                // TODO: Handle errors in form
            }
        })
    } else if (currentUser) {
        let p = new Property()

        p.set('address', propertyForm.address.value)
        p.set('city', propertyForm.city.value)
        p.set('state', propertyForm.state.value)
        p.set('zip', propertyForm.zip.value)
        p.set('owner', currentUser)

        p.save(null, {
            success: p => {
                currentUser.set('property', p)
                currentUser.save()

                let t = new Tree()

                query = new Parse.Query(Species)
                query.get(treeForm.species.value, {
                    success: species => {
                        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + p.get('address') + ', ' + p.get('city') + ', ' + p.get('state') + ' ' + p.get('zip'), data => {
                            let location = data['results'][0]['geometry']['location']

                            t.set('height_feet', parseFloat(treeForm.height.value))
                            t.set('harvest_pounds', parseFloat(treeForm.yield.value))
                            t.set('harvest_date', ripeningdate.getDate())
                            t.set('sprayed', treeForm.sprayed.value)
                            t.set('property', p)
                            t.set('species', species)
                            t.set('latlng', new Parse.GeoPoint([location.lat, location.lng]))

                            t.save(null, {
                                success: (t) => {
                                    treeForm.reset()
                                    $('.modal').hide()

                                    L.circleMarker([location.lat, location.lng], {radius: 7, fillColor: '#6CC644', fillOpacity: 1})
                                        .addTo(map)
                                        .bindPopup(popupTemplate({
                                            title: species.get('name'),
                                            date: moment.utc(t.get('harvest_date')).format('MMM Do'),
                                            yield: t.get('harvest_pounds'),
                                            height: t.get('height_feet'),
                                            sprayed: t.get('sprayed')
                                        }))
                                },
                                error: (t, error) => {
                                    // TODO: Handle errors in form
                                }
                            })
                        })
                    },
                    error: (species, error) => {
                        // TODO: Handle errors in form
                    }
                })
            },
            error: (p, error) => {
                // TODO: Handle errors in form
            }
        })
    } else {
        $('.modal').hide()
        $('#propertysignup').show()
    }
}
  , propertysignup = e => {
    e.preventDefault()

    let user = new Parse.User()
    user.set('username', propertysignupForm.email.value)
    user.set('email', propertysignupForm.email.value)
    user.set('password', propertysignupForm.password.value)
    user.set('fullname', propertysignupForm.fullname.value)
    user.set('phone', propertysignupForm.phone.value)

    user.signUp(null, {
        success: user => {
            currentUser = user
            signinUI()

            let p = new Property()

            p.set('address', propertyForm.address.value)
            p.set('city', propertyForm.city.value)
            p.set('state', propertyForm.state.value)
            p.set('zip', propertyForm.zip.value)
            p.set('owner', currentUser)

            p.save(null, {
                success: p => {
                    currentUser.set('property', p)
                    currentUser.save()

                    let t = new Tree()

                    query = new Parse.Query(Species)
                    query.get(treeForm.species.value, {
                        success: species => {
                            t.set('height_feet', parseFloat(treeForm.height.value))
                            t.set('harvest_pounds', parseFloat(treeForm.yield.value))
                            t.set('harvest_date', ripeningdate.getDate())
                            t.set('sprayed', treeForm.sprayed.value)
                            t.set('property', p)
                            t.set('species', species)

                            t.save(null, {
                                success: t => {
                                    treeForm.reset()
                                    $('.modal').hide()
                                },
                                error: (t, error) => {
                                    // TODO: Handle errors in form
                                }
                            })
                        },
                        error: (species, error) => {
                            // TODO: Handle errors in form
                        }
                    })
                },
                error: (p, error) => {
                    // TODO: Handle errors in form
                }
            })            
        },
        error: (user, error) => {
            // TODO: Handle errors in form
        }
    })
}
  , join = e => {
    e.preventDefault()

    joinsignupForm.fullname.value = joinForm.fullname.value
    joinsignupForm.email.value = joinForm.email.value
    joinsignupForm.phone.value = joinForm.phone.value

    $('.modal').hide()
    $('#joinsignup').show()
}
 , joinsignup = e => {
    e.preventDefault()

    let user = new Parse.User()
    user.set('username', joinsignupForm.email.value)
    user.set('email', joinsignupForm.email.value)
    user.set('password', joinsignupForm.password.value)
    user.set('fullname', joinsignupForm.fullname.value)
    user.set('phone', joinsignupForm.phone.value)

    user.signUp(null, {
        success: user => {
            currentUser = user
            signinUI()
            $('.modal').hide()
        },
        error: (user, error) => {
            // TODO: Handle errors in form
        }
    })
}

if (currentUser) {
    signinUI()
} else {
    signoutUI()
}

$('#signout').click(e => {
    e.preventDefault()
    Parse.User.logOut()
    signoutUI()    
})

signinForm.addEventListener('submit', signin, false)
signupForm.addEventListener('submit', signup, false)
treeForm.addEventListener('submit', tree, false)
joinForm.addEventListener('submit', join, false)
joinsignupForm.addEventListener('submit', joinsignup, false)
propertysignupForm.addEventListener('submit', propertysignup, false)








