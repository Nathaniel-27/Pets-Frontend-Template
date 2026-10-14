// I got this from: https://reactgo.com/react-document-title/

import { useEffect, useState } from "react";

const useDocTitle = title => {
  const [doctitle, setDocTitle] = useState(title);

  useEffect(() => {
    document.title = doctitle;
  }, [doctitle]);

  return [doctitle, setDocTitle];
};

export {useDocTitle};