document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('commission-form');
  const waBtn = document.getElementById('wa-send');
  const ownerEmail = 'thomas1reynolds09@gmail.com';
  const waNumber = '+1 7152891510';

  function encodeField(s){ return encodeURIComponent(s || ''); }

  function buildMessage(data){
    return `Hi, I’d like to commission a custom diecast build.%0AName: ${encodeField(data.fullName)}%0AEmail: ${encodeField(data.email)}%0AModel: ${encodeField(data.model)}%0AScale: ${encodeField(data.scale)}%0AInterior: ${encodeField(data.interior)}%0ABudget: ${encodeField(data.budget)}%0AShipping: ${encodeField(data.shipping)}%0APayment: ${encodeField(data.payment)}%0ANotes: ${encodeField(data.notes)}`;
  }

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());

      // Netlify form capture (when deployed)
      if(form.hasAttribute('data-netlify')){
        fetch('/', {method:'POST', body: fd}).catch(()=>{});
      }

      // Open user's email client with prefilled content
      const subject = encodeURIComponent('Commission Request from Website - ' + (data.fullName || ''));
      const body = `Name: ${data.fullName || ''}%0AEmail: ${data.email || ''}%0AModel: ${data.model || ''}%0AScale: ${data.scale || ''}%0AInterior: ${data.interior || ''}%0ABudget: ${data.budget || ''}%0AShipping: ${data.shipping || ''}%0APayment: ${data.payment || ''}%0ANotes: ${data.notes || ''}`;
      const mailto = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
      window.location.href = mailto;

      // Open WhatsApp chat with prefilled message
      const waMsg = buildMessage(data);
      const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;
      window.open(waUrl, '_blank');

      alert('An email window opened for you to send; WhatsApp chat also opened. Please press send in your email or WhatsApp to complete the request.');
      form.reset();
    });
  }

  if(waBtn){
    waBtn.addEventListener('click', function(){
      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());
      const waMsg = buildMessage(data);
      window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank');
    });
  }
});
