import RenderSpinner from "./RenderSpinner";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Header() {
  const [header, setHeader] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getDataHeader() {
    try {
      const { data, error } = await supabase.from("header").select("*");
      if (error) throw error;

      setHeader(data);
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataHeader();
  }, []);

  return (
    <>
      {loading ? (
        <RenderSpinner />
      ) : (
        <>
          {header.map((item) => (
            <div
              className="profileMain d-flex flex-column gap-1 align-items-center"
              key={item.id}
            >
              <img src={item.imgURL} alt="" />
              <h2 className="text-center">{item.title}</h2>
              <h6 className="text-center">{item.descriptions}</h6>
            </div>
          ))}
        </>
      )}
    </>
  );
}
