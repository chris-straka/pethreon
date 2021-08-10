interface SpacerProps {
  marginTop?: string,
  marginBottom?: string
}

export const Spacer = ({ marginTop = "0px", marginBottom = "0px" }: SpacerProps) => {

  const styles = {
    marginTop: marginTop,
    marginBottom: marginBottom
  }

  return <div style={styles} />
}