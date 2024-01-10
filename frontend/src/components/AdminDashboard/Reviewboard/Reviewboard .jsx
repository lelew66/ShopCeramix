import React from "react";

const Reviewborad = (props) => {
  const firstLine = props.text.split(/[\n!.,]/)[0];

  return (
    <tr className="table-row">
      <td className="table-data">{props.id}</td>
      <td className="table-data">{props.product_id}</td>
      <td className="table-data">{props.title}</td>
      <td className="table-data">{props.rate}</td>
      <td className="table-data">{props.country}</td>
      <td className="table-data">{props.date}</td>
      <td className="table-data">{firstLine}</td>
    </tr>
  );
};

export default Reviewborad;
