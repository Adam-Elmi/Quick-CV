export default function Contact({ contact }) {
    return (
        <div id={contact.id}>
            <div id="contact-title">
                {contact.title}
            </div>
            {
                contact ? contact.fields.map((field, id) => (
                    <div key={id} id={field + "-wrapper"}>
                        <span id={field + "_icon"}  className={contact.icons[id]}></span>
                        <p id={field}>{field.slice(0, 1).toUpperCase() + field.slice(1)}</p>
                    </div>
                ))
            : null}
        </div>
    )
}