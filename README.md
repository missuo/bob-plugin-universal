# bob-plugin-universal
As the name suggests, this plugin allows you to use any custom translation API.

## Encapsulate API
### Request Parameters
- text: string
- source_lang: string
- target_lang: string

**`text` and `target_lang` are required, `source_lang` is optional.**

### Response
```json
{
  "code": 200,
  "data": "there is no one else"
}
```
**Please note that a successful translation request must include data and StatusCode. Please strictly follow RESTful API return Code.**

## Currently Compatible APIs
- [OwO-Network/DeepLX](https://github.com/OwO-Network/DeepLX)
- [missuo/openai-translate](https://github.com/missuo/openai-translate)