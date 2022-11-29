export const REJECTED_TEMP = (name: string, message: string) => {
  return `
  <div
  class="container"
  style="
    width: 350px;
    text-align: center;
    color: #000;
    font-size: 20px;
    font-family: 'open sans', Arial, Helvetica, sans-serif;
    margin: 0 auto;">
  <h2
  style="font-size: 30px"
  >Kraude Donate Service</h2>
  <p>
  Hello, ${name}. Sorry, but we can't approve you to be volunteer now.
  Your document are not correct.
  ${message}
  Please send us correct document.
  </p>
  <p>Best regards,Kraude Donate</p>
</div>
  `;
};
