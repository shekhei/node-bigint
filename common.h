#define REQ_STR_ARG(I, VAR)             \
  if (args.Length()<= (I) || !args[I]->IsString())      \
    return ThrowException(Exception::TypeError(     \
      String::New("Argument " #I " must be a string")));  \
  Local<String> VAR = Local<String>::Cast(args[I]);

#define REQ_UTF8_ARG(I, VAR)              \
  if (args.Length() <= (I) || !args[I]->IsString())     \
    return ThrowException(Exception::TypeError(                     \
      String::New("Argument " #I " must be a utf8 string"))); \
  String::Utf8Value VAR(args[I]->ToString());

#define REQ_INT32_ARG(I, VAR)             \
  if (args.Length() <= (I) || !args[I]->IsInt32())      \
    return ThrowException(Exception::TypeError(                     \
      String::New("Argument " #I " must be an int32")));      \
  int32_t VAR = args[I]->ToInt32()->Value();

#define REQ_UINT32_ARG(I, VAR)              \
  if (args.Length() <= (I) || !args[I]->IsUint32())     \
    return ThrowException(Exception::TypeError(                     \
      String::New("Argument " #I " must be a uint32")));      \
  uint32_t VAR = args[I]->ToUint32()->Value();

#define REQ_INT64_ARG(I, VAR)             \
  if (args.Length() <= (I) || !args[I]->IsNumber())     \
    return ThrowException(Exception::TypeError(                     \
      String::New("Argument " #I " must be an int64")));      \
  int64_t VAR = args[I]->ToInteger()->Value();

#define REQ_UINT64_ARG(I, VAR)              \
  if (args.Length() <= (I) || !args[I]->IsNumber())     \
    return ThrowException(Exception::TypeError(                     \
      String::New("Argument " #I " must be a uint64")));      \
  uint64_t VAR = args[I]->ToInteger()->Value();

#define REQ_BITCNT_ARG(I, VAR)              \
  if (args.Length() <= (I) || !args[I]->IsNumber())     \
    return ThrowException(Exception::TypeError(                     \
      String::New("Argument " #I " must be an int64")));      \
  mp_bitcnt_t VAR = args[I]->ToInteger()->Value();

#define WRAP_RESULT(RES, VAR)             \
  Handle<Value> arg[1] = { External::New(*RES) };       \
  Local<Object> VAR = constructor_template->GetFunction()->NewInstance(1, arg);