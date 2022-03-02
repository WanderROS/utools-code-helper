import React from 'react'
import TextField from '@material-ui/core/TextField'
import Output from './Components/Output'

export default class CmdParse extends React.Component {
  state = {
    input: '',
    result: ''
  }


  transRaw2HexDot(input) {
    let strArr = [];
    let n = 2;
    for (let i = 0, l = input.length; i < l/n; i++) {
      let a = input.slice(n*i, n*(i+1));
      strArr.push(a.toLowerCase());
    }
    return strArr.join(",")
  }

  componentDidMount () {
    if (this.props.type === 'regex') {
      const input = this.props.payload
      this.setState({ input })
      try {
        this.setState({ result: this.transRaw2HexDot(input) })
      } catch (e) {
        this.setState({ result: '' })
      }
    }
  }

  handleInputChange = (e) => {
    const input = e.target.value
    this.setState({ input })
    try {
      this.setState({ result: this.transRaw2HexDot(input) })
    } catch (e) {
      this.setState({ result: '' })
      console.log("failure")
    }
  }

  render () {
    const { input, result } = this.state
    return (
      <div>
        <TextField
          label=''
          placeholder='原始指令，示例: AA3FDB00000045000004040102006402100601000000FF000000045400FFDB47384C0000003D05FFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF010104010101E3'
          autoFocus
          multiline
          rows={12}
          variant='filled'
          fullWidth
          onChange={this.handleInputChange}
          value={input}
        />
        <Output label='结果' value={result} copyIndex={this.props.copyIndex} index={1} />
      </div>
    )
  }
}
