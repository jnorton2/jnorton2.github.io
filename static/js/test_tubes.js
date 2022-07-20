function create_tube(tube, fill_ratio, fill_color, width, height, x_offset, y_offset) {
    var non_fill_color = "transparent";
    var bounce_height = 10;
    var wave_height = -10;
    var top = tube.find(".test-tube-top")[0];
    var rim = tube.find(".test-tube-rim")[0];
    var container = tube.find(".test-tube-container")[0];
    var fill_body = tube.find(".test-tube-fill-body")[0];
    var fill_bottom = tube.find(".test-tube-fill-bottom")[0];
    var bubble = tube.find(".test-tube-bubble")[0];
    var wave = tube.find(".test-tube-wave")[0];
    var all_elements = [top, rim, container, fill_body, fill_bottom, wave];
    var offset_from_width = width / 8;
    var small_x_offset = x_offset + offset_from_width
    var small_width = width - (2 * offset_from_width);
    var top_height = small_width * 11 / 12;
    var container_height = height - top_height;
    var fill_height = container_height * fill_ratio;
    var fill_offset = container_height * (1 - fill_ratio);

    var tl = new TimelineMax();
    var bubbletl = new TimelineMax();


    $(".test-tube-container").hover(
        function () {
            $(this).css('fill', fill_color);
            $(this).css('fill-opacity', ".1");
        },
        function () {
            $(this).css('fill', non_fill_color);
            $(this).css('fill-opacity', "1");
        }
    );


    TweenMax.set(top, {
        attr: {
            width: small_width,
            height: top_height,
            x: small_x_offset,
            y: y_offset,
            fill: fill_color,
            rx: (1 / 12) * width,
            ry: (1 / 12) * width
        }
    });
    TweenMax.set(rim, {
        attr: {
            width: width,
            height: offset_from_width,
            y: y_offset + top_height - offset_from_width,
            x: x_offset,
            fill: fill_color,
            rx: (1 / 12) * width,
            ry: (1 / 12) * width
        }
    });

    TweenMax.set(container, {
        attr: {
            width: small_width,
            height: container_height,
            y: y_offset + top_height - offset_from_width,
            x: small_x_offset,
            fill: non_fill_color,
            stroke: fill_color,
            "stroke-width": "3",
            rx: (1 / 12) * width,
            ry: (1 / 12) * width
        }
    });
    TweenMax.set(fill_bottom, {
        attr: {
            d: "M" + small_x_offset + " " +
                (y_offset + container_height + top_height - offset_from_width) + " " +
                "a " +
                (.25 * small_width) + " " +
                (.25 * small_width) + " 180 0 0 " +
                (small_width) + " 0",
            fill: fill_color,
            stroke: fill_color,
            "stroke-width": "3"
        }
    });

    function ripple() {
        //To left
        tl.to(wave, .25,
            {
                attr: {
                    d: "M" + small_x_offset + " " +
                        (y_offset + top_height - offset_from_width + fill_offset) + " " +
                        "s " +
                        (-10) + " " + (wave_height) + ", " +  //slope at begining
                        (small_width) + " 0" // endpoint
                }
            }
        );

        //To center
        tl.to(wave, .25,
            {
                attr: {
                    d: "M" + small_x_offset + " " +
                        (y_offset + top_height - offset_from_width + fill_offset) + " " +
                        "s " +
                        (0) + " " + (0) + ", " +  //slope at begining
                        (small_width) + " 0" // endpoint
                }
            });

        //To right
        tl.to(wave, .25,
            {
                attr: {
                    d: "M" + small_x_offset + " " +
                        (y_offset + top_height - offset_from_width + fill_offset) + " " +
                        "s " +
                        (small_width) + " " + (wave_height) + ", " +  //slope at begining
                        (small_width) + " 0" // endpoint
                }
            });

        //To center
        tl.to(wave, .25,
            {
                attr: {
                    d: "M" + small_x_offset + " " +
                        (y_offset + top_height - offset_from_width + fill_offset) + " " +
                        "s " +
                        (0) + " " + (0) + ", " +  //slope at begining
                        (small_width) + " 0" // endpoint
                }
            });
    }

    //Animations
    function fill() {
        tl.fromTo(fill_body, 1, {
                attr: {
                    width: small_width,
                    height: 0,
                    y: y_offset + top_height - offset_from_width + fill_offset + fill_height,
                    x: small_x_offset,
                    fill: fill_color,
                    stroke: fill_color,
                    "stroke-width": "3"
                }
            },
            {
                attr: {
                    height: fill_height,
                    y: y_offset + top_height - offset_from_width + fill_offset
                },
                ease: Power1.easeIn
            }
        );

        var radius = getRandomArbitrary(5, 10);
        var max = small_width - radius - offset_from_width;
        var min = radius + offset_from_width;

        //Bottom to top
        tl.fromTo(wave, 1,
            {
                attr: {
                    d: "M" + small_x_offset + " " +
                        (y_offset + top_height - offset_from_width + fill_offset + fill_height) + " " +
                        "s " +
                        (.5 * small_width) + " " + (0) + ", " +  //slope at begining
                        (small_width) + " 0", // endpoint
                    fill: fill_color,
                    stroke: fill_color,
                    "stroke-width": "3"
                }
            },
            {
                attr: {
                    d: "M" + small_x_offset + " " +
                        (y_offset + top_height - offset_from_width + fill_offset) + " " +
                        "s " +
                        (.5 * small_width) + " " + (0) + ", " +  //slope at begining
                        (small_width) + " 0" // endpoint
                },
                ease: Power1.easeIn
            },
            "-=1"
        );

        ripple()

    }

    function bounce() {
        tl.to(all_elements, .2, {
                transform: "translate(0, -" + bounce_height + "px)",
                ease: Power3.easeOut
            }
        );
        tl.to(all_elements, .2, {
                transform: "translate(0px)",
                ease: Power3.easeIn
            }
        );
    }


    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function bubbleUp(delay) {
        var radius = getRandomArbitrary(5, 10);
        var max = small_width - radius - offset_from_width;
        var min = radius + offset_from_width;

        bubbletl.fromTo(bubble, getRandomArbitrary(1.5, 3),
            {
                attr: {
                    cx: x_offset + (getRandomArbitrary(min, max)),
                    cy: y_offset + height - 10,
                    r: radius,
                    fill: fill_color
                },
                opacity: 0
            },
            {
                attr: {
                    cx: x_offset + getRandomArbitrary(min, max),
                    cy: y_offset + (top_height / 2)
                },
                opacity: .5
            },
            "+=" + delay
        );

    }

    fill();
    bubbleUp(1);
    for (var i = 0; i < 3; i++) {
        bubbleUp(0);
    }

    $(fill_body).on("click", function () {
        ripple()
    });
    $(top).on("click", function () {
        bounce();
        ripple();
        ripple();
    });
    $(container).on("click", function () {
        bubbleUp(0);
    });
}

function refresh_tubes() {
    var w = 80;
    var h = 250;
    create_tube(
        $("#tt1"), .6,
        "#826BBF",
        w, h,
        0, 10
    );

    create_tube(
        $("#tt2"), .4,
        "#5b4a85",
        w, h,
        100, 10
    );


    create_tube(
        $("#tt3"), .5,
        "#342a4c",
        w, h,
        200, 10
    );
}

// refresh_tubes();