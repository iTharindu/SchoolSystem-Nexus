(function() {
var Nav;
Nav = {
  init: function() {
    this.setup();
    return this.uiBind();
  },
  setup: function() {
    return $(this).find('li:not(:last-child)').toggleClass('invisible');
  },
  uiBind: function() {
    return $(document).on('click', '#mainnav', function(e) {
      e.preventDefault();
      return $(this).find('li:not(:last-child)').toggleClass('animate').toggleClass('invisible');
    });
  }
};
Nav.init();
}).call(this);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLEdBQUEsR0FBTTtJQUNKLElBQUEsRUFBTyxRQUFBLENBQUEsQ0FBQTtNQUNMLElBQUksQ0FBQyxLQUFMLENBQUE7YUFDQSxJQUFJLENBQUMsTUFBTCxDQUFBO0lBRkssQ0FESDtJQUtKLEtBQUEsRUFBUSxRQUFBLENBQUEsQ0FBQTthQUNOLENBQUEsQ0FBRSxVQUFGLENBQ0UsQ0FBQyxJQURILENBQ1EscUJBRFIsQ0FFRSxDQUFDLFdBRkgsQ0FFZSxXQUZmO0lBRE0sQ0FMSjtJQVVKLE1BQUEsRUFBUyxRQUFBLENBQUEsQ0FBQTthQUNQLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxFQUFaLENBQWUsT0FBZixFQUF3QixVQUF4QixFQUFvQyxRQUFBLENBQUMsQ0FBRCxDQUFBO1FBQ2pDLENBQUUsQ0FBQyxjQUFKLENBQUE7ZUFDQSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLHFCQUFiLENBQ0UsQ0FBQyxXQURILENBQ2UsU0FEZixDQUVFLENBQUMsV0FGSCxDQUVlLFdBRmY7TUFGa0MsQ0FBcEM7SUFETztFQVZMOztFQWtCTixHQUFHLENBQUMsSUFBSixDQUFBO0FBbEJBIiwic291cmNlc0NvbnRlbnQiOlsiTmF2ID0ge1xuICBpbml0IDogLT4gXG4gICAgdGhpcy5zZXR1cCgpO1xuICAgIHRoaXMudWlCaW5kKCk7XG4gICAgXG4gIHNldHVwIDogLT5cbiAgICAkKCcjbWFpbm5hdicpXG4gICAgICAuZmluZCgnbGk6bm90KDpsYXN0LWNoaWxkKScpXG4gICAgICAudG9nZ2xlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgIFxuICB1aUJpbmQgOiAtPlxuICAgICQoZG9jdW1lbnQpLm9uICdjbGljaycsICcjbWFpbm5hdicsIChlKS0+XG4gICAgICAoZSkucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQodGhpcykuZmluZCgnbGk6bm90KDpsYXN0LWNoaWxkKScpXG4gICAgICAgIC50b2dnbGVDbGFzcygnYW5pbWF0ZScpXG4gICAgICAgIC50b2dnbGVDbGFzcygnaW52aXNpYmxlJyk7XG59XG5cbk5hdi5pbml0KCk7Il19
//# sourceURL=coffeescript
//# sourceURL=pen.js
