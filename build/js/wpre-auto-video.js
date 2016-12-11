// Adds Responsive Embeds to all iframe, objects and video tags
jQuery(document).ready(function() {
  jQuery('iframe, object, embed, video').each(function() {
    if ( jQuery(this).innerWidth() / jQuery(this).innerHeight() > 1.5 ) {
      jQuery(this).wrap("<div class='widescreen responsive-embed'/>");
    } else {
      jQuery(this).wrap("<div class='responsive-embed'/>");
    }
  });
});
