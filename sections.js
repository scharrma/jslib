/* sections.js allows for click/directional swapping of DOM elements
 * $SECTIONS contains the elements to cycle through
 */

function keyup_change_sections(event)
{
  // select the visible section
  current_section = $SECTIONS.filter(function() { return $(this).css('display') != 'none' });
  switch (event.keyCode) {
    case 37:
    case 38:
    // go to previous section
    change_sections(current_section, 'previous');
    break;
    case 39:
    case 40:
    // go to next section
    change_sections(current_section, 'next');
    break;
    default:
    // do nothing
    break;
  }
}

function change_sections(current_section, direction)
{
  if (direction == 'next')
    display_next_section(current_section);
  else
    display_previous_section(current_section);
}

function display_next_section(current_section)
{
  current_section.fadeOut(500, function() { display_section(current_section.next(), $FIRST) });
}

function display_previous_section(current_section)
{
  current_section.fadeOut(500, function() { display_section(current_section.prev(), $LAST) })
}

function display_section(section, rollover)
{
  if (section.length)
    section.fadeIn(500);
  else
    rollover.fadeIn(500);
}

$(document).ready(function()
{
  $SECTIONS = $("section");
  $FIRST    = $($SECTIONS[0]);
  $LAST     = $($SECTIONS[$SECTIONS.length - 1]); // JQuery returns these elements in DOM order

  // bind click and keyup events
  $SECTIONS.on("click", function() { change_sections($(this), 'next') });
  $(window).on("keyup", function(e) { keyup_change_sections(e) });
});
