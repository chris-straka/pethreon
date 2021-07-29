interface SpacerProps {
  marginTop: string,
  marginBottom: string
}

export const Spacer = ({ marginTop = "1rem", marginBottom = "1rem" }: SpacerProps) => {

  const styles = {
    marginTop: marginTop,
    marginBottom: marginBottom
  }

  return <div style={styles}></div>
}