function copyToClipboard(pix_text, paypal_text, ok_text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = 'd33c43b3-5272-435b-9698-28bb9a6f524c';
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  Swal.fire({
    title: pix_text,
    html: `<strong class="mb-2"> ${paypal_text} </strong>` +
      `<form action="https://www.paypal.com/donate" method="post" class="mt-2 overflow-hidden center" target="_top">
        <input type="hidden" name="business" value="5U95Q2KQV7SMJ" />
        <input type="hidden" name="no_recurring" value="0" />
        <input type="hidden" name="item_name" value="help me with the database pls :))) 
        thanks" />
        <input type="hidden" name="currency_code" value="BRL" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_BR/i/scr/pixel.gif" width="1" height="1" />
        </form>
        `,
    confirmButtonText: ok_text,
    width: 650,
    color: '#716add',
    backdrop: `
        rgba(0,0,123,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `
  })
}