import ContactItem from "./ContactItem";
import RenderSpinner from "./RenderSpinner";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import UploadeDelete from "./UploadeDelete";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function App() {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getInstruments() {
    try {
      const { data, error } = await supabase.from("contacts").select("*");
      if (error) throw error;
      console.log("🚀 ~ getInstruments ~ data:", data);

      setContact(data);
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInstruments();
  }, []);

  return (
    <div>
      <div className="container-sm d-flex flex-column align-items-center">
        <div className="contentCard d-flex flex-column gap-4 align-items-center">
          <div className="profileMain d-flex flex-column gap-1 align-items-center">
            <img src="./imgs/logo-bg.png" alt="" />
            <h2 className="text-center">DORIANO</h2>
            <h6 className="text-center">
              Doriano is an E-Commerce Site. You'll Find The Best Products at
              The Best Prices. You Can Contact Us Using The Contact Information
              Below to Order Products. Thank You.
            </h6>
          </div>
          {loading ? (
            <RenderSpinner />
          ) : (
            <div className="scund d-flex flex-column gap-2 align-items-center">
              {contact.map((item, index) => (
                <ContactItem
                  key={index}
                  contactUrl={item.contactUrl}
                  contactName={item.contactName}
                  contactImgUrl={item.contactImgUrl}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
