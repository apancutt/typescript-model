import { Entity } from "./Entity";
import type { Configs } from "./Entity";
import { EntityError } from "./EntityError";

export class AttrError<C extends Configs> extends EntityError<C> {

  public attrName: keyof C;

  constructor(entity: Entity<C>, attrName: keyof C, message?: string) {
    super(entity, message);
    this.attrName = attrName;
  }

}
