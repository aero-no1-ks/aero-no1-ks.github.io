$(() => {
  //** initial animation
  setTimeout(() => {
    $('body').append("<div id='alert'><p>If you want to download as a PDF file, please press the key '1'.</p></div>")

    setTimeout(() => $('#alert').remove(), 3000)
  }, 1500)


  $(document).keyup(e => {
    if(e.which == 49) window.open('https://v2018.api2pdf.com/chrome/url?url=https://wisdomkim.github.io/resume&apikey=402bfc4f-93da-4551-b829-f836a4108361')
  })
})
