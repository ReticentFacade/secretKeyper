# GnuPG

*Source: https://www.gnupg.org/*

## Initialisation: 

```
➜  ~ gpg --gen-key
gpg (GnuPG) 2.4.3; Copyright (C) 2023 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Note: Use "gpg --full-generate-key" for a full featured key generation dialog.

GnuPG needs to construct a user ID to identify your key.

Real name: test
Email address: test
Not a valid email address
Email address: test@gmail.com
You selected this USER-ID:
    "test <test@gmail.com>"

Change (N)ame, (E)mail, or (O)kay/(Q)uit? O
```
![paraphrase](image.png)

You need to use **YOUR** `GPG_KEY_ID` (in this example it's: `E7E6DCCCA0FB20D85F0E3D67C093FFB8AD98F576`) to initiate `keyper` CLI:
```
➜  ~ gpg --gen-key
gpg (GnuPG) 2.4.3; Copyright (C) 2023 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Note: Use "gpg --full-generate-key" for a full featured key generation dialog.

GnuPG needs to construct a user ID to identify your key.

Real name: test
Email address: test
Not a valid email address
Email address: test@gmail.com
You selected this USER-ID:
    "test <test@gmail.com>"

Change (N)ame, (E)mail, or (O)kay/(Q)uit? O
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: revocation certificate stored as '/Users/Reticent/.gnupg/openpgp-revocs.d/E7E6DCCCA0FB20D85F0E3D67C093FFB8AD98F576.rev'
public and secret key created and signed.

pub   ed25519 2023-08-30 [SC] [expires: 2026-08-29]
      E7E6DCCCA0FB20D85F0E3D67C093FFB8AD98F576
uid                      test <test@gmail.com>
sub   cv25519 2023-08-30 [E] [expires: 2026-08-29]
```

## Changing the expiration-date
Changing it to: `does not expire`
```
➜  ~ gpg --edit-key E7E6DCCCA0FB20D85F0E3D67C093FFB8AD98F576
gpg (GnuPG) 2.4.3; Copyright (C) 2023 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

sec  ed25519/C093FFB8AD98F576
     created: 2023-08-30  expires: 2026-08-29  usage: SC
     trust: ultimate      validity: ultimate
ssb  cv25519/82F0A60544388E1C
     created: 2023-08-30  expires: 2026-08-29  usage: E
[ultimate] (1). test <test@gmail.com>

gpg> expire
Changing expiration time for the primary key.
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 0
Key does not expire at all
Is this correct? (y/N) y

sec  ed25519/C093FFB8AD98F576
     created: 2023-08-30  expires: never       usage: SC
     trust: ultimate      validity: ultimate
ssb  cv25519/82F0A60544388E1C
     created: 2023-08-30  expires: 2026-08-29  usage: E
[ultimate] (1). test <test@gmail.com>

gpg> quit
Save changes? (y/N) y
➜  ~ 
```

## List your keys
```
➜  ~ gpg --list-keys
gpg: checking the trustdb
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   2  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 2u
[keyboxd]
---------
pub   ed25519 2023-08-30 [SC]
      E7E6DCCCA0FB20D85F0E3D67C093FFB8AD98F576
uid           [ultimate] test <test@gmail.com>
sub   cv25519 2023-08-30 [E] [expires: 2026-08-29]
```