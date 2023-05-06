function ProductContainer(props) {
    return (
      <div className="grid grid-cols-12 gap-6">
        {props.children}
      </div>
    );
  }

export default ProductContainer