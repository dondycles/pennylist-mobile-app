import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

const useMoneys = () => {
  const [moneys, setMoneys] = useState<any[]>([]);
  const [moneysFetching, setMoneysFetching] = useState(false);

  const getMoneys = useCallback(async () => {
    setMoneysFetching(true);
    try {
      const { data, error } = await supabase
        .from("moneys")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching moneys:", error);
      } else {
        setMoneys(data);
      }
    } catch (error) {
      console.error("Error fetching moneys:", error);
    } finally {
      setMoneysFetching(false);
    }
  }, []);

  useEffect(() => {
    getMoneys();
  }, [getMoneys]);

  return { moneys, moneysFetching, refetchMoneys: getMoneys };
};

export default useMoneys;
