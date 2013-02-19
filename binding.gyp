{
  "targets": [
    {
      "target_name": "bigint",
      "sources": [ "bigint.cc" ],
      'link_settings': {
          'libraries': [
              '-lgmp'
          ]
      }
    }
  ]
}