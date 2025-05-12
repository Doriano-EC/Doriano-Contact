function ContactItem({ contactUrl, contactName, contactImgUrl }) {
  return (
    <a
      href={contactUrl}
      target="_blank"
      className="item d-inline-flex justify-content-center align-items-center gap-2"
    >
      <img src={contactImgUrl} alt="" />
      <p>{contactName}</p>
    </a>
  );
}

export default ContactItem;
