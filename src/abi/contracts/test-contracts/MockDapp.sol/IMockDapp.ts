/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface IMockDappInterface extends utils.Interface {
  functions: {
    "getDomainSeperator()": FunctionFragment;
    "getStructHash(address,uint256)": FunctionFragment;
    "hashTypedDataV4(bytes32)": FunctionFragment;
    "recoverSigner(bytes32,uint8,bytes32,bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getDomainSeperator"
      | "getStructHash"
      | "hashTypedDataV4"
      | "recoverSigner"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getDomainSeperator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getStructHash",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "hashTypedDataV4",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverSigner",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "getDomainSeperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStructHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hashTypedDataV4",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverSigner",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IMockDapp extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IMockDappInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getDomainSeperator(overrides?: CallOverrides): Promise<[string]>;

    getStructHash(
      player: PromiseOrValue<string>,
      points: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    hashTypedDataV4(
      _structHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    recoverSigner(
      hash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  getDomainSeperator(overrides?: CallOverrides): Promise<string>;

  getStructHash(
    player: PromiseOrValue<string>,
    points: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  hashTypedDataV4(
    _structHash: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  recoverSigner(
    hash: PromiseOrValue<BytesLike>,
    v: PromiseOrValue<BigNumberish>,
    r: PromiseOrValue<BytesLike>,
    s: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    getDomainSeperator(overrides?: CallOverrides): Promise<string>;

    getStructHash(
      player: PromiseOrValue<string>,
      points: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    hashTypedDataV4(
      _structHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    recoverSigner(
      hash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getDomainSeperator(overrides?: CallOverrides): Promise<BigNumber>;

    getStructHash(
      player: PromiseOrValue<string>,
      points: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashTypedDataV4(
      _structHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    recoverSigner(
      hash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getDomainSeperator(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStructHash(
      player: PromiseOrValue<string>,
      points: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hashTypedDataV4(
      _structHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    recoverSigner(
      hash: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
